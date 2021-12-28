import json

from .config import CONFIG
from . import git


def update_version() -> None:
    print(
        f"Current Firefox version number: {_read_version(CONFIG.paths.manifest_firefox)}"
    )
    print(
        f"Current Chrome version number: {_read_version(CONFIG.paths.manifest_chrome)}"
    )

    version = input("\nNew version number: ")

    _write_version(CONFIG.paths.manifest_firefox, version)
    _write_version(CONFIG.paths.manifest_chrome, version)

    git.create_release(version)


def _read_version(manifest_path: str) -> str:
    with open(manifest_path, "r", encoding="utf-8") as manifest:
        return json.load(manifest)["version"]


def _write_version(manifest_path: str, new_version: str) -> None:
    with open(manifest_path, "r+", encoding="utf-8") as manifest:
        content = json.load(manifest)
        content["version"] = new_version

        manifest.seek(0)
        json.dump(content, manifest, indent=4, ensure_ascii=False)
