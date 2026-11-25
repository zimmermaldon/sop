import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const cloudClient=url&&key&&!url.includes('YOUR_PROJECT_REF')&&!key.startsWith('YOUR_')?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}}):null;
export async function loadState(userId){if(!cloudClient)return null;const {data,error}=await cloudClient.from('daymark_state').select('payload,updated_at').eq('user_id',userId).maybeSingle();if(error)throw error;return data}
export async function saveState(userId,payload){if(!cloudClient)return null;const {data,error}=await cloudClient.from('daymark_state').upsert({user_id:userId,payload,updated_at:new Date().toISOString()},{onConflict:'user_id'}).select('updated_at').single();if(error)throw error;return data}
export async function requestLoginCode(email){if(!cloudClient)throw new Error('Configure Supabase in .env.local first.');return cloudClient.auth.signInWithOtp({email,options:{shouldCreateUser:true}})}
export async function verifyLoginCode(email,token){if(!cloudClient)throw new Error('Configure Supabase in .env.local first.');return cloudClient.auth.verifyOtp({email,token,type:'email'})}
