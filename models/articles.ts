import * as db from "../helpers/database";

export const getById = async (id: any) => {
    let query = "SELECT * FROM articles WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

export const getAll = async () => {
    let query = "SELECT * FROM articles;";
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

export const updateById = async (article: any , id: any) => {
    let values = [id];
    let query = `UPDATE articles SET title = '${article.title}' , alltext = '${article.alltext}' , summary = '${article.summary}' ,imageurl = '${article.imageurl}' , published = '${article.published}' , authorid = '${article.authorid}'  WHERE id = ${values};`;
    try{
        await db.run_update(query, values);
        return { status: 201 };
    } catch(err: any) {
        return err;                                                                                                                                                                                                                                                                                                                  
    }

}

export const deleteById = async (id: any) => {
    let values = [id];
    let query =  `DELETE FROM articles WHERE id='${values}';`

    try{
        await db.run_delete(query, values);
        return { status: 201 };
    } catch(err: any) {
        return err;                                                                                                                                                                                                                                                                                                                  
    }
}