import re

cadmium_path = "./cadmium.js"
result_path = "./bn-cadmium-playercore-%s.js"
result_firefox = result_path % "firefox"
result_chrome = result_path % "chrome"
user_agent_fix_path = "./firefox-linux-user-agent-fix.js"


def main():
    content = get_file_content(cadmium_path)

    content = fix_bitrate_menu(content)
    firefox_content = fix_firefox_linux_user_agent(content)

    with open(result_firefox, "w") as firefox_file:
        firefox_file.write(firefox_content)
    with open(result_chrome, "w") as chrome_file:
        chrome_file.write(content)


def fix_bitrate_menu(content: str) -> str:
    """ Returns the passed str with the reenabled bitrate menu. """
    regex = r"(\.shiftKey&&83==[a-zA-Z0-9]+\.keyCode)&&[^&]+"
    result = re.search(regex, content)
    if result is None:
        raise Exception(
            f"The file {cadmium_path} does not contain '.shiftKey&&83==[variable].keyCode&&[bool]'. The regular expression may need to be modified."
        )
    return re.sub(regex, r"\1", content)


def fix_firefox_linux_user_agent(content: str) -> str:
    """ Returns the passed str with javascript code that changes the user agent on Linux to Chrome's user agent. """
    user_agent_fix = get_file_content(user_agent_fix_path)
    return f"{user_agent_fix}\n{content}"


def get_file_content(path: str) -> str:
    with open(path, "r") as file:
        return file.readlines()


if __name__ == "__main__":
    main()
