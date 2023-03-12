SELECT
    users.id,
    users.first_name,
    users.last_name,
    usersContact.phone1,
    usersContact.phone2,
    usersContact.email,
    usersAddress.address,
    usersAddress.city,
    usersAddress.county,
    usersAddress.state,
    usersAddress.zip
FROM
    users
    LEFT JOIN usersContact ON users.id = usersContact.user_id
    LEFT JOIN usersAddress ON users.id = usersAddress.user_id;