// Algunas funciones que me sirvieron para setear o modificar la base de datos.

// Esta base de datos es la que se inicializa con firabse
const db = 'Hola'
async function getAllStudentbyCourse() {
  try {
    // Conseguiremos los id de cada curso
    const coursesids = [];
    const courses = await db.collection("courses").get();

    courses.forEach((doc) => {
      coursesids.push(doc.id);
    });

    coursesids.forEach(async (courseID) => {
      const studentEnrolled = [];
      const data = await db.collection("users").where("courses", "array-contains-any", [courseID]).get();
      data.forEach((doc) => {
        studentEnrolled.push(doc.id);
      });
      console.log(studentEnrolled)
      db.collection('courses').doc(courseID).update({
        students: studentEnrolled
      })
    });
  } catch (e) {
    console.log("Error getting documents: ", e);
  }
}

console.log(getAllStudentbyCourse)