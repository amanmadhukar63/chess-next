
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