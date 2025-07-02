export const validateUser = (requireUsername = false) => {
  return (req, res, next) => {
    const { username, email, password } = req.body;

    const errors = {};
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (requireUsername) {
      if (!trimmedUsername) {
        errors.username = "Username is required.";
      } else if (trimmedUsername.length < 3) {
        errors.username = "Username must be at least 3 characters long.";
      }
    }

    if (!trimmedEmail) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!trimmedPassword) {
      errors.password = "Password is required.";
    } else if (trimmedPassword.length < 4) {
      errors.password = "Password must be at least 4 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    req.body.username = trimmedUsername;
    req.body.email = trimmedEmail;
    req.body.password = trimmedPassword;

    next();
  };
};
