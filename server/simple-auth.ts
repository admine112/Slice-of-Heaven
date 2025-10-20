// Простая аутентификация без базы данных
// Просто проверяем логин и пароль

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';

export function checkAuth(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
