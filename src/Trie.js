const root;
class Trie {
  
  
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
    return Trie.Node;
  }

  static getRootNode(){
    let root =  new Trie.TrieNode();
    return root;
  }
  
  static insert(word){
      let current = Trie.getRootNode();
      let current1 = Trie.getRootNode();

      if(current == current1)
        console.log("Same")
      // for(let i in root)
      //   console.log(i);
      console.log(current.childen)
  }
}

Trie.insert("Word")
