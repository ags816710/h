const autht = {
    file: async (req, res) => {
        return [false, '/index?redir=/file']
    }
}

const lockedFiles = {
    '\\file.html': autht.file,
    '\\file': autht.file
};

module.exports = {
    canAccess: async (filePath, req, res) => {
        if (lockedFiles[filePath]) {
            return await lockedFiles[filePath](req, res)
        }
        return [true]
    },
};
