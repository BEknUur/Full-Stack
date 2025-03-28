# 2 Сущности
. Сущности проекта и CRUD-операции
В MVP для QazaqRental можно выделить три основные сущности:

User (Пользователь)
Car (Автомобиль)
Booking (Бронирование)
Для каждой сущности требуется минимум по 4 операции: создать (Create), прочитать (Read), обновить (Update), удалить (Delete).

3.1 User (Пользователь)
Создать пользователя (Create)
Эндпоинт: POST /users
Действие: Регистрация нового пользователя, указываются логин/пароль, роль (owner, renter) и контактные данные.

Получить список пользователей (Read)
Эндпоинт: GET /users
Действие: Получение списка всех пользователей (доступно только администратору или с ограниченными данными).

Получить пользователя по ID (Read)
Эндпоинт: GET /users/{user_id}
Действие: Получение детальной информации по конкретному пользователю (сам пользователь или администратор).

Обновить данные пользователя (Update)
Эндпоинт: PUT /users/{user_id}
Действие: Обновление профиля (смена пароля, контактных данных, роли).

Удалить пользователя (Delete)
Эндпоинт: DELETE /users/{user_id}
Действие: Удаление пользователя из системы (только администратор или сам пользователь).

3.2 Car (Автомобиль)
Создать объявление об аренде автомобиля (Create)
Эндпоинт: POST /cars
Действие: Владельцы добавляют машину в список доступных для аренды (описание, цена, фото, локация).

Получить список всех автомобилей (Read)
Эндпоинт: GET /cars
Действие: Поиск доступных машин, фильтрация по разным параметрам (локация, цена, марка и т.д.).

Получить автомобиль по ID (Read)
Эндпоинт: GET /cars/{car_id}
Действие: Детальная информация об автомобиле.

Обновить информацию об автомобиле (Update)
Эндпоинт: PUT /cars/{car_id}
Действие: Обновление данных о машине (например, смена цены, добавление новых фотографий). Может делать только владелец или администратор.

Удалить автомобиль (Delete)
Эндпоинт: DELETE /cars/{car_id}
Действие: Снятие объявления с публикации. Может делать только владелец или администратор.

3.3 Booking (Бронирование)
Создать бронирование (Create)
Эндпоинт: POST /bookings
Действие: Арендатор выбирает машину и даты аренды, формируя запрос на бронирование.

Получить список бронирований (Read)
Эндпоинт: GET /bookings
Действие: Получение списка всех бронирований (администратор видит все; владелец видит только свои авто; арендатор — только свои бронирования).

Получить бронирование по ID (Read)
Эндпоинт: GET /bookings/{booking_id}
Действие: Детали конкретного бронирования. Доступно владельцу этого авто, арендатору, который бронировал, или администратору.

Обновить бронирование (Update)
Эндпоинт: PUT /bookings/{booking_id}
Действие: Например, изменить даты бронирования (доступно арендатору или владельцу для подтверждения).

Удалить бронирование (Delete)
Эндпоинт: DELETE /bookings/{booking_id}
Действие: Отменить бронирование (владелец/арендатор/администратор).




#  Роли пользователей
В рамках MVP определим как минимум две роли:

Owner (Владелец):

Может создавать объявления (Car).
Может просматривать бронирования, связанные с его автомобилями, подтверждать или отклонять их.
Может редактировать/удалять только свои авто и бронирования, связанные с ними.
Renter (Арендатор):

Может просматривать список автомобилей.
Может создавать бронирования (Booking) и просматривать/отменять свои бронирования.
Не имеет права редактировать чужие объявления или бронирования.
Дополнительно можно ввести Admin (Администратор):

Имеет полный доступ к системе:
Просматривать всех пользователей
Удалять/блокировать пользователей
Удалять любые объявления и бронирования в случае нарушения правил.





#  Разбиение задач на этапы 

1. Создать базовый эндпоинт /health

2. Написать CRUD 

3. Добавить Авторизации и ролей

4. Настройка базы данных

5.  Тестирование эндпоинтов

6. Деплой на сервер