module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  }

  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, email, password]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const getUserLogin = (email, password) => {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND password = $2', values: [email, password]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }


  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  }

  const getItinerary = () => {
    const query = {
      text: 'SELECT * FROM travel_destination',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserItinerary = (user_id) => {
    const query = {
      text: `SELECT * FROM travel_destination WHERE users_id = $1 RETURNING *`,
      values: [user_id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  }

  const getItineraryById = (id) => {
    const query = {
      text: `SELECT * 
          FROM travel_destination
          WHERE id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addItinerary = (users_id, name, description, location, startDate, endDate, lat, lng) => {
    const query = {
      text: `INSERT INTO travel_destination (users_id, name, description, location, travel_start_date, travel_end_date,  lat, lng) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      values: [users_id, name, description, location, startDate, endDate, lat, lng]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const editItinerary = (id, users_id, name, description, location, travel_start_date, travel_end_date) => {
    const query = {
      text: `UPDATE travel_destination
      SET users_id = $2,
      name = $3,
      description = $4,
      location = $5,
      travel_start_date = $6,
      travel_end_date = $7
      WHERE id = $1;` ,
      values: [id, users_id, name, description, location, travel_start_date, travel_end_date]
    }

    return db.query(query)
        .then(result => result.rows[0])
        // .catch(err => err);
  }

  const deleteItinerary = (id) => {
    const query = {
      text: `DELETE FROM travel_destination
      WHERE id = $1;`,
      values: [id]
    }

    return db.query(query)
        .then(result => result.rows[0])
        // .catch(err => err);
  }

  const editPin = (travel_destination_id, pinned_name, long, lat, date) => {
    const query = {
      text: `UPDATE pins
      SET travel_destination_id = $1,
      pinned_name = $2,
      long = $3,
      lat = $4,
      date = $5,
      WHERE id = $1;` ,
      values: [travel_destination_id, pinned_name, long, lat, date]
    }

    return db.query(query)
        .then(result => result.rows[0])
        // .catch(err => err);
  }

  const getTravelPlanById = (email) => {
    const query = {
      text: `SELECT pins.*
        FROM travel_destination
        JOIN pins ON travel_destination.id = pins.travel_destination_id
        WHERE travel_destination.id = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCommentsById = (email) => {
    const query = {
      text: `SELECT comments.*, users.first_name, users.last_name
        FROM travel_destination
        JOIN comments ON travel_destination.id = comments.travel_destination_id
        JOIN users ON users.id = comments.users_id
        WHERE travel_destination.id = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addComment = (users_id, travel_destination_id, comment) => {
    const query = {
      text: `INSERT INTO comments (users_id, travel_destination_id, comment) VALUES ($1, $2, $3) RETURNING *`,
      values: [users_id, travel_destination_id, comment]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const addPin = (travel_destination_id, name, lat, long, date) => {
    const query = {
      text: `INSERT INTO pins (travel_destination_id, pinned_name, lat, long, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [travel_destination_id, name, lat, long, date]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const addUserRegistration = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, email, password]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }


  const getUserDetails = (user_id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [user_id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUsersPosts,
      getItinerary,
      getTravelPlanById,
      getCommentsById,
      addComment,
      getUserLogin,
      addUserRegistration, 
      getUserDetails,
      addPin,
      getItineraryById,
      addItinerary,
      getUserLogin,
      getUserItinerary,
      editItinerary,
      editPin,
      deleteItinerary
  };
};