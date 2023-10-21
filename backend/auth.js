const lockedFiles = {
    '\\in.html': async (req, res) => {
        return [false, '/index?redir=/ln'];
    },
    '\\in': async(req, res) => {
        return [false, '/index?redir=/ln']
    }
};

module.exports = {
    canAccess: async (filePath, req, res) => {
        if (lockedFiles[filePath]) {
            return await lockedFiles[filePath](req, res)
        }
        return [true]
    },
};
