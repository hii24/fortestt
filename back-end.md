Поріг AML – GET – /api/aml_threshold/value/

Змінити поріг AML – POST – /api/aml_threshold/

Список депозитів – GET – /api/deposits/

Список обмінів – GET – /api/exchanges/

Створити обмін – POST – /exchange/api/create/

Розрахувати обмін – POST – /exchange/api/calculate/

Деталі обміну – GET – /exchange/api/<unique_id>/

Редагувати обмін – PATCH – /exchange/api/<unique_id>/edit/

Котирування «один до одного» – GET – /exchange/api/quote-one-whitebit/

Котирування діапазону – GET – /exchange/api/quote-range-whitebit/

Список реферальних обмінів – GET – /exchange/api/referral/

Список налаштувань комісій – GET – /api/feesettings/

Змінити налаштування комісії – PATCH – /api/feesettings/<pk>/

Останні транзакції – GET – /api/lastest_transactions/

Оновлення ринку – GET – /api/market_update/

Список ордерів – GET – /api/orders/

Створити ордер – POST – /api/orders/

Статус транзакції – POST – /api/transaction_status/

Список виведень – GET – /api/withdrawals/

Список виведень партнера – GET – /partner/api/withdrawal/

Деталі виведення партнера – PATCH – /partner/api/withdrawal/<pk>/

Виведення від імені адміністратора – POST – /partner/api/withdrawal/from_admin/

Поріг AML – GET – /api/aml_threshold/value/

Змінити поріг AML – POST – /api/aml_threshold/

Список монет – GET – /coin/api/coin/

Розрахувати ціну монети – POST – /coin/api/coin/calculate/

Список мереж монет – GET – /coin/api/coin_network/

Деталі мережі монети – PATCH – /coin/api/coin_network/<pk>/

Деталі константи валюти – GET – /constant/api/json/<key>/

Деталі числової константи – GET – /constant/api/numeric/<key>/

Оновити JSON-константу – PATCH – /constant/api/json/<key>/

Оновити числову константу – PATCH – /constant/api/numeric/<key>/

XML валют для партнерів – GET – /coin/integration/xml/

Список мереж – GET – /network/api/network/

Перемкнути Gate – POST – /network/api/toggle-gate/

Статистика за діапазоном дат – POST – /statistic/api/date-range/

Реєстрація користувача – POST – /user/api/auth/registration/

Авторизація користувача – POST – /user/api/auth/authorization/

Змінити пароль – POST – /user/api/auth/change-password/

Оновити JWT – POST – /user/api/jwt/refresh/

Посилання користувача – GET – /user/api/user/link/

Статистика користувача – GET – /user/api/user/statistics/

Виведення користувача – POST – /user/api/user/withdraw/

Валідація гаманця – POST – /coin/api/wallet/validate/

Деталі інтеграції обміну – GET – /exchange/integration/<unique_id>/

Статус інтеграції обміну – GET – /exchange/integration/<unique_id>/status/

Створити транзакцію інтеграції – POST – /exchange/integration/create_transaction/