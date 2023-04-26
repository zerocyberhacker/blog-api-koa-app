import * as db from "../helpers/database";

export const findByUsername = async (username: any) => {
    const query = 'SELECT * FROM users where username = ?'
    const user = await db.run_query(query, [username]);
    return user;
}

export const getById = async (id: any) => {
    let query = "SELECT * FROM users WHERE id = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}


export const getByName = async (username: any) => {
    let query = "SELECT * FROM users WHERE username = ?";
    let values = [username];
    let data = await db.run_query(query, [username]);
    return data;
}

export const getAll = async () => {
    let query = "SELECT * FROM users;";
    let data = await db.run_query(query, null);
    return data;
}

export const add = async(article: any) => {
    let keys = Object.keys(article);
    let values = Object.values(article)
    let key = keys.join(',');
    let param = '';
    for(let i: number = 0; i< values.length; i++){
        param += '? ,';
    }
    param = param.slice(0, -1);
    let query = `INSERT INTO articles (${key}) VALUES (${param})`;
    try{
        await db.run_insert(query, values);
        return {status: 201};
    }catch(err: any){
        return err;
    }
}

export const updateById = async (user: any , id: any) => {
    let values = [id];
    let query = `UPDATE users SET firstname = '${user.firstname}' , lastname = '${user.lastname}' , username = '${user.username}' ,about = '${user.about}' , password = '${user.password}' , passwordsalt = '${user.passwordsalt}' , email = '${user.email}' , avatarurl = '${user.avatarurl}'  WHERE id = ${values};`;
    try{
        await db.run_update(query, values);
        return { status: 201 };
    } catch(err: any) {
        return err;                                                                                                                                                                                                                                                                                                                  
    }
}

export const deleteById = async (id: any) => {
    let values = [id];
    let query =  `DELETE FROM users WHERE id='${values}';`

    try{
        await db.run_delete(query, values);
        return { status: 201 };
    } catch(err: any) {
        return err;                                                                                                                                                                                                                                                                                                                  
    }
}