class TrieNode {
    static get Node() {
        return class Node {
            constructor() {
                let trieNode = this;
                trieNode.endOfWord = false;
                trieNode.childen = {};
                return trieNode;
            }
        };
    }
    static get TrieNode() {
        return TrieNode.Node;
    }
}

module.exports = TrieNode;