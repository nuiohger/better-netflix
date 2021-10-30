import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Paths:
    manifest_firefox: str = os.path.join("dist", "firefox", "manifest.json")
    manifest_chrome: str = os.path.join("dist", "chrome", "manifest.json")

    zip_firefox: str = os.path.join("build", "better-netflix-firefox.zip")
    zip_chrome: str = os.path.join("build", "better-netflix-chrome.zip")


@dataclass(frozen=True)
class _Config:
    paths: Paths = Paths()


CONFIG = _Config()
