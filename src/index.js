module.exports = function check(str, bracketsConfig) {
  const BRACKET_UNKNOW  = 0;
  const BRACKET_OPEN    = 1;
  const BRACKET_CLOSED  = 2;
  const BRACKET_MULTI   = 3;

  
  function pairOfBracket(bracket) {   
    for(let i = 0; i < bracketsConfig.length; i++) {      
      if(bracketsConfig[i][0] == bracket) {
        return bracketsConfig[i][1] ;
      }
      if(bracketsConfig[i][1] == bracket) {
        return bracketsConfig[i][0] ;
      }
    }
  }

  function typeOfBracket(bracket) {
    for(let i = 0; i < bracketsConfig.length; i++) {
      if(bracketsConfig[i][0] == bracket && 
         bracketsConfig[i][1] == bracket) {
        return BRACKET_MULTI;
      } else if(bracketsConfig[i][0] == bracket) {
        return BRACKET_OPEN;
      } else if(bracketsConfig[i][1] == bracket) {
        return BRACKET_CLOSED;
      } 
    }

    return BRACKET_UNKNOW;
  }
  
  let brackets = [];
  for(let i = 0; i < str.length; i++) {
    let bracket = str[i];
    let type = typeOfBracket(bracket);
    if(type == BRACKET_UNKNOW || 
      (i == 0 && type == BRACKET_CLOSED)) {
        return false;
    }

    switch(type) {      
      case BRACKET_OPEN:
        brackets.push(bracket);
        break;

      case BRACKET_CLOSED:
        let prevBracket = brackets[brackets.length - 1];
        let openBracket = pairOfBracket(bracket);
        if (prevBracket == openBracket) {
          brackets.pop();
        } else {
          return false;
        }
        break;

      case BRACKET_MULTI:
        if(brackets.length == 0) {
          brackets.push(bracket);
        } else {
          let prevBracket = brackets[brackets.length - 1];
          if (prevBracket == bracket) {
            brackets.pop();
          } else {
            brackets.push(bracket);
          }
        }        
        break;        
    }
  }

  return (brackets.length == 0);
}


