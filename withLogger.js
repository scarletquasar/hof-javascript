const sessionStorageLogger = {
    setup: () => {
        if (!sessionStorage["logs"]) {
            sessionStorage["logs"] = JSON.stringify([]);
        }
    },
    logs: () => JSON.parse(sessionStorage["logs"]),
    add: (log) => {
        const currentLogs = sessionStorageLogger.logs();
        currentLogs.push([new Date().toLocaleString(), JSON.stringify(log)]);
        sessionStorage["logs"] = JSON.stringify(currentLogs);
    }
};

async function fetchWithLogger(responseType, logger, ...args) {
    const result = await fetch(...args);
    const response = result[responseType]();
    logger.setup();
    logger.add(await response);
    return response;
}