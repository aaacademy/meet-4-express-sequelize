module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        published: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Book;
}