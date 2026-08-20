#!/usr/bin/env python3
"""Browser-level visual and interaction checks for the 2.5D armour hero."""

from __future__ import annotations

import json
import os
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait


ROOT = Path(__file__).resolve().parents[2]
ARTIFACTS = ROOT / "artifacts"
GECKODRIVER = ROOT / "source-assets/tools/geckodriver/geckodriver"
URL = os.environ.get("ARMOUR_QA_URL", "http://127.0.0.1:3000/")


def browser(width: int, height: int, reduced_motion: bool = False) -> webdriver.Firefox:
    options = Options()
    options.add_argument("-headless")
    options.set_preference("browser.tabs.warnOnClose", False)
    options.set_preference("media.autoplay.default", 5)
    options.set_preference("ui.prefersReducedMotion", 1 if reduced_motion else 0)
    driver = webdriver.Firefox(service=Service(str(GECKODRIVER)), options=options)
    driver.set_window_size(width, height)
    return driver


def load_hero(driver: webdriver.Firefox):
    driver.get(URL)
    wait = WebDriverWait(driver, 20)
    # Wait for hydration and the intentionally brief boot sequence. Clicking the
    # server-rendered button before React attaches its handler is not a valid QA.
    time.sleep(2.1)
    try:
        remaining = driver.find_elements(By.XPATH, "//button[contains(., 'Skip Boot')]")
        if remaining:
            remaining[0].click()
        wait.until(
            lambda current: not current.find_elements(
                By.XPATH, "//button[contains(., 'Skip Boot')]"
            )
        )
    except Exception:
        pass
    return wait.until(
        lambda current: current.find_element(
            By.CSS_SELECTOR, "button[aria-label^='Open KJ armour helmet']"
        )
    )


def layout_snapshot(driver: webdriver.Firefox) -> dict:
    return driver.execute_script(
        """
        const root = document.documentElement;
        const hero = document.querySelector('#hero');
        const stage = document.querySelector('.iron-man-armour-stage');
        const hotspot = document.querySelector('.iron-man-helmet-hotspot');
        const rect = (node) => node ? Object.fromEntries(
          ['x','y','width','height','top','right','bottom','left'].map(k => [k, node.getBoundingClientRect()[k]])
        ) : null;
        return {
          viewport: { width: innerWidth, height: innerHeight },
          overflowX: root.scrollWidth > root.clientWidth,
          document: { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth },
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          hero: rect(hero),
          stage: rect(stage),
          hotspot: rect(hotspot),
          helmetOpen: hotspot?.getAttribute('aria-expanded')
        };
        """
    )


def capture_pair(width: int, height: int, prefix: str, touch: bool = False) -> dict:
    driver = browser(width, height)
    try:
        hotspot = load_hero(driver)
        driver.save_screenshot(str(ARTIFACTS / f"hero-{prefix}-closed.png"))
        closed = layout_snapshot(driver)
        if touch:
            hotspot.click()
        else:
            ActionChains(driver).move_to_element(hotspot).perform()
        WebDriverWait(driver, 4).until(
            lambda current: current.find_element(
                By.CSS_SELECTOR, ".iron-man-helmet-hotspot"
            ).get_attribute("aria-expanded")
            == "true"
        )
        time.sleep(0.85)
        driver.save_screenshot(str(ARTIFACTS / f"hero-{prefix}-open.png"))
        opened = layout_snapshot(driver)
        hotspot.send_keys(Keys.ESCAPE)
        WebDriverWait(driver, 4).until(
            lambda current: current.find_element(
                By.CSS_SELECTOR, ".iron-man-helmet-hotspot"
            ).get_attribute("aria-expanded")
            == "false"
        )
        return {"closed": closed, "open": opened, "escapeClosed": True}
    finally:
        driver.quit()


def check_viewport(width: int, height: int) -> dict:
    driver = browser(width, height)
    try:
        hotspot = load_hero(driver)
        hotspot.send_keys(Keys.ENTER)
        WebDriverWait(driver, 4).until(
            lambda current: current.find_element(
                By.CSS_SELECTOR, ".iron-man-helmet-hotspot"
            ).get_attribute("aria-expanded")
            == "true"
        )
        return layout_snapshot(driver)
    finally:
        driver.quit()


def check_reduced_motion() -> dict:
    driver = browser(1440, 900, reduced_motion=True)
    try:
        hotspot = load_hero(driver)
        hotspot.send_keys(Keys.ENTER)
        time.sleep(0.2)
        return layout_snapshot(driver)
    finally:
        driver.quit()


def main() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    report = {
        "desktop": capture_pair(1440, 900, "desktop"),
        "mobile": capture_pair(390, 844, "mobile", touch=True),
        "viewports": {},
    }
    for width, height in [
        (320, 568),
        (375, 667),
        (768, 1024),
        (1366, 768),
        (1920, 1080),
    ]:
        report["viewports"][f"{width}x{height}"] = check_viewport(width, height)
    report["reducedMotion"] = check_reduced_motion()
    (ARTIFACTS / "armour-browser-qa.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )

    failures = []
    for name, snapshot in report["viewports"].items():
        if snapshot["overflowX"]:
            failures.append(f"horizontal overflow at {name}")
        hotspot = snapshot["hotspot"]
        if hotspot and (hotspot["width"] < 44 or hotspot["height"] < 44):
            failures.append(f"helmet target below 44px at {name}")
    if failures:
        raise SystemExit("QA_FAILED: " + "; ".join(failures))
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
