//Câu 1
function isPrime(n){
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if(n % i === 0){
            return false;
        }
    }
    return true;
}

const numbers = [1,2,3,4,5,6,7];
const primeNum = numbers.filter((num) => isPrime(num));
console.log(primeNum);

//Câu 2
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    occupation: 'developer',
    nationality: 'American',
    city: 'New York',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['English', 'Spanish'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Harvard University'
    }
};

const {
    firstName,
    gender,
    education: { degree },
    languages: [english,spanish]
} = person;



const student = {
    firstName: firstName,
    gender: gender,
    education: degree,
    languages: english
};
// console.log(student);

//câu 3
function getInfo(n) {
    if (!n) return "Dữ liệu trống";
    const firstName = n.firstName ?? "Quân";
    const degree = n.degree ?? "NA";
    return `firstName: ${firstName} - degree: ${degree}`;
}
const sv1={
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    languages: 'English'
}
const sv2={
    name: 'John',
    gender: 'male',
    degreee: '',
    languages: 'English'
}
console.log(getInfo(sv1));
console.log(getInfo(sv2));

//câu 4
let courses = [
    {
        id: 1,
        title: "ReactJS Tutorial",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Angular Tutorial",
        rating: 2.5,
    },
    {
        id: 3,
        title: "VueJS Tutorial",
        rating: 3.8,
    },
    {
        id: 4,
        title: "Java Tutorial",
        rating: 4,
    },
    {
        id: 5,
        title: "JavaScript Tutorial",
        rating: 3.5,
    },
];

const filter = courses.filter((course) => course.rating >= 4);
console.log("Course rating hơn 4:", filter);

//câu 5
const filter2 = courses.filter((course) => course.rating < 4);
const course2 = filter2.map((filter2) => `<${filter2.id}> - <${filter2.title}> - <${filter2.rating}>`);
console.log("Course rating bé hơn 4", course2);

//câu 6
let addedCourses = [
    {
        id: 6,
        title: "PHP Tutorial",
        rating: 3,
    },
    {
        id: 7,
        title: "C# Tutorial",
        rating: 2,
    },
    {
        id: 8,
        title: "Docker Tutorial",
        rating: 3.8,
    }
];

const sumAllCourse = [...courses, ...addedCourses];
console.log("Tổng hợp course: ", sumAllCourse);