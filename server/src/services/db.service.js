const database = require('../config/database');
const DatabaseUtil = require('../util/db.util');

const dbService = (migrate, fillDatabase) => {
    const authenticateDB = () => database.authenticate();

    const dropDB = () => database.drop();

    const syncDB = () => database.sync();

    const successfulDBStart = () => (
        console.info('Connection to the database was successfully')
    );

    const errorDBStart = (err) => (
        console.info('Unable to connect to the database:', err)
    );

    const startMigrateTrue = async () => {
        try {
            await syncDB();
            successfulDBStart();
        } catch (err) {
            errorDBStart(err);
        }
    };

    const startMigrateFalse = async () => {
        try {
            await dropDB();
            await syncDB();
            successfulDBStart();
        } catch (err) {
            errorDBStart(err);
        }
    };

    const startDev = async () => {
        try {
            await authenticateDB();

            if (migrate) {
                return startMigrateTrue();
            }

            return startMigrateFalse();
        } catch (err) {
            return errorDBStart(err);
        }
    };

    const start = async () => {

        await startDev();
        if (fillDatabase){
            DatabaseUtil().fillDatabase();
        }
        
    };

    return {
        start,
    };
};

module.exports = dbService;