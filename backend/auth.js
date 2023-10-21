const autht = {
    in: async (req, res) => {
        return [false, '/index?redir=in']
    }
}

const lockedFiles = {
    '\\in.html': autht.in,
    '\\in': autht.in
};

module.exports = {
    canAccess: async (filePath, req, res) => {
        if (lockedFiles[filePath]) {
            return await lockedFiles[filePath](req, res)
        }
        return [true]
    },
};
