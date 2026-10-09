
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field !== "string") continue;
      errors[field] ??= [];
      errors[field].push(issue.message);
    }

    return res.status(400).json({
      ok: false,
      message: "Please correct the submitted fields.",
      errors,
    });
  }

  req.validatedBody = result.data;
  return next();
};