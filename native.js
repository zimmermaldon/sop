import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { isTauri } from '@tauri-apps/api/core';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
export const isCapacitor=Capacitor.isNativePlatform();
export const isNative=isCapacitor||isTauri();
const noticeId=id=>{let h=0;for(const c of String(id))h=(Math.imul(31,h)+c.charCodeAt(0))|0;return Math.abs(h%2147483647)||1};
export async function requestNativeNotificationPermission(){if(isCapacitor){const result=await LocalNotifications.requestPermissions();return result.display==='granted'}if(isTauri()){if(await isPermissionGranted())return true;return (await requestPermission())==='granted'}return false}
export async function scheduleNativeReminder(task){if(!isNative||!task.remindAt)return;if(isCapacitor){const perm=await LocalNotifications.checkPermissions();if(perm.display!=='granted')return;const at=new Date(task.remindAt);if(Number.isNaN(at.getTime())||at.getTime()<=Date.now())return;const id=noticeId(task.id);await LocalNotifications.cancel({notifications:[{id}]});await LocalNotifications.schedule({notifications:[{id,title:'Daymark reminder',body:task.title,schedule:{at},extra:{taskId:task.id}}]})}}
export async function cancelNativeReminder(taskId){if(isCapacitor){try{await LocalNotifications.cancel({notifications:[{id:noticeId(taskId)}]})}catch{}}}
export async function sendDesktopNotification(title,body){if(isTauri())await sendNotification({title,body})}
