const {Course} = require('../models')
const departments = ['Math', 'English', 'Spanish', 'Art', 'PE', 'World Languages', 'Social Studies', 'Science'].sort();

//view all
module.exports.viewAll = async function (req, res) {
    const courses = await Course.findAll();
    res.render('course/view_all', {courses});
}
//profile
module.exports.viewProfile= async function(req, res){
    const course = await Course.findByPk(req.params.id);
    res.render('course/profile', {course})
}
//render add form

//add
module.exports.renderEditForm = function(req, res){
    const course = {
        name: '',
        department: '',
        instructor_name: '',
        description: ''
    }
    res.render('course/add', {course, departments});
}
//render edit form
module.exports.renderEditForm = async function(req, res){
    const course = await Course.findByPk(req.params.id);
    res.render('course/edit', {course, departments});
}
//update
module.exports.updateCourse = async function(req, res){
    const course = await Course.update({
        name: req.body.name,
        department: req.body.department,
        instructor: req.body.instructor_name,
        description: req.body.description
    }, {
        where: {
        id: req.params.id
    }
    });
    res.redirect(`/course/profile/${req.params.id}`);
}
//delete