def is_properly_structured(text: str) -> bool:
    text_lower = text.lower()

    # Minimum length check
    if len(text_lower) < 800:
        return False

    # Required sections
    required_sections = ["experience", "education", "skills"]

    for section in required_sections:
        if section not in text_lower:
            return False

    return True
