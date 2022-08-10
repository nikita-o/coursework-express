export const isAuth = (req, res, next) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({
      error: 'Не аутентифицированый пользователь!',
      status: "error"
    })
  }
  next()
}
