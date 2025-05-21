


module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log("Validation failed:", error.details.map(d => d.message).join(", "));
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  };
};