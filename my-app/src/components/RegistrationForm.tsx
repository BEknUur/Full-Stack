import React, { useState } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Обработчик изменения полей
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя не может быть пустым';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email не может быть пустым';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль не может быть пустым';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не короче 6 символов';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверяем валидацию
    const isValid = validateForm();
    if (isValid) {
      // Если форма валидна, делаем, что нужно: отправляем на сервер, показываем сообщение и т.д.
      console.log('Форма отправлена', formData);
      // Очистка формы (пример)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}
      </div>

      <div style={styles.field}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
      </div>

      <div style={styles.field}>
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}
      </div>

      <div style={styles.field}>
        <label htmlFor="confirmPassword">Подтвердите пароль:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p style={styles.error}>{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;

// Для примера небольшие inline-стили:
const styles: Record<string, React.CSSProperties> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  field: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '5px',
  },
};
