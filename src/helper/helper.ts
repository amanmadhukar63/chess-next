
export function setLocalStorage( key: string, data: string){
  if( typeof window !== 'undefined' && localStorage ){
    localStorage.setItem( key, data );
  }
}

export function getLocalStorage( key: string ){
  if( typeof window !== 'undefined' && localStorage ){
    const data = localStorage.getItem( key );
    return data ? JSON.parse( data ) : null;
  }
  return null;
}

export function removeLocalStorage( key: string ){
  if( typeof window !== 'undefined' && localStorage ){
    localStorage.removeItem( key );
  }
}

export function generateCode( len: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < len; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}