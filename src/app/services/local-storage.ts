import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })  
export class LocalStorageService {
    storage: Storage;
    cache: {[key: string]: string} = {};

    constructor() {
        this.storage = localStorage;
    }

    clear() : void {
        this.storage.clear();
        this.cache = {};
    }

    has(key: string) : boolean {
        let inCache = this.cache[key] != null;
        return inCache || this.storage.getItem(key) != null;
    }

    /**
     * 
     * @param prefix Comprueba si tenemos en caché algún elemento con el prefijo indicado
     */
    existsInCacheByPrefix(prefix: string) : boolean {
        let inCache = Object.keys(this.cache).findIndex(k => k.indexOf(prefix) === 0);
        return inCache != -1;
    }

    set(key: string, value: any) : void {
        let jsonVal = value != null ? JSON.stringify(value) : null;
        this.storage.setItem(key, jsonVal);
        this.cache[key] = value;
    }

    get(key: string, defaultValue?: any) : any {
        let value = this.cache[key];
        if (value == null) {
            let rawValue = this.storage.getItem(key);
            value = rawValue !== null ? JSON.parse(rawValue) : null;
            this.cache[key] = value;
        }
        return value != null ? value : defaultValue;
    }

    public allKeys() : string[] {
        let keys : string[] = [];
        let i = 0;
        while (this.storage.key(i) != null) {
            keys.push(this.storage.key(i));
            i++;
        }

        return keys;
    }

    public remove(key: string) : any {
        let value = this.get(key);
        this.storage.removeItem(key);
        delete this.cache[key];
        return value;
    }
    
}