import db from "../models";
import crudService from "../services/crud-service";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("homePage.ejs", {
            data: JSON.stringify(data),
        });
    }
    catch (e) {
        console.log(e);
    }

}
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req, res) => {
    let message = await crudService.createNewUser(req.body);
    return res.send("post crud from server");
}
let displayCRUD = async (req, res) => {
    let data = await crudService.getAllUser();

    return res.render('display-crud.ejs', {
        dataTable: data
    });
}
let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await crudService.getUserInfoById(userId);
        console.log(userData);

        return res.render("editCRUD.ejs",
            { userData: userData });
    }
    return res.send('User not found');
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await crudService.updateUserData(data);
    return res.render('display-crud.ejs', {
        dataTable: allUsers
    });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await crudService.deleteUserById(id);
        return res.send('Delete the user  success')
    }
    else {
        return res.send('User not found!')
    }

}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}