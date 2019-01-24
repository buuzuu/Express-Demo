const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then( () => console.log('Connected to MongoDb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema(
{
    name: {type: String, required: true },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished; }

    }
}
);

const Course = mongoose.model('Course', courseSchema);


async function createCourse(){

    const course = new Course(
        {
            name: 'Java',
            author:'Indeer',
            tags: ['java', 'frontend'],
            isPublished: true,
         //   price: 2500
        }
    ); 
    
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
 
    
}
createCourse();


async function getCourses(){
    const result =  await Course.find();
    console.log(result);
}

// getCourses();

async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    course.set({
        isPublished: false,
        author: "Primo"
    });

    const result = await course.save();
    console.log(result);
}

//updateCourse('5c237ec947f5c41b51329e1c');

async function removeCourse(id){

const result = await Course.deleteOne({_id: id});

console.log(result);
}
//removeCourse('5c21f370130f36292b5baa16');
