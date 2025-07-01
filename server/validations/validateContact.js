export const validateContact = (req, res, next) => {
  const { username, email, message } = req.body;

  const errors = {};
  const trimmedUsername = username?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedUsername) {
    errors.username = "Username is required.";
  } else if (trimmedUsername.length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!trimmedMessage) {
    errors.message = "Message is required.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.username = trimmedUsername;
  req.body.email = trimmedEmail;
  req.body.message = trimmedMessage;

  next();
};
