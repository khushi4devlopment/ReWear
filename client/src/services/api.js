const API=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
export const serverURL=import.meta.env.VITE_SERVER_URL||'http://localhost:5000';
export async function api(path,{method='GET',body,token,form=false}={}){const headers={};if(token)headers.Authorization=`Bearer ${token}`;if(!form)headers['Content-Type']='application/json';const res=await fetch(`${API}${path}`,{method,headers,body:form?body:body?JSON.stringify(body):undefined});let data={};try{data=await res.json()}catch{}if(!res.ok)throw new Error(data.message||'Request failed');return data;}
