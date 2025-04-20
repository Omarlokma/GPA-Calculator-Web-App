document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const addCourseBtn = document.getElementById('add-course');
    const calculateBtn = document.getElementById('calculate');
    const calculateAnotherBtn = document.getElementById('calculate-another');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

    function getLetterGrade(gpa) {
        if (gpa >= 3.67) return { letter: "A+", color: "green" };
        if (gpa >= 3.33) return { letter: "A", color: "lime" };
        if (gpa >= 3.0) return { letter: "B+", color: "orange" };
        if (gpa >= 2.67) return { letter: "B", color: "darkorange" };
        if (gpa >= 2.33) return { letter: "C+", color: "coral" };
        if (gpa >= 2.0) return { letter: "C", color: "salmon" };
        if (gpa >= 1.0) return { letter: "D", color: "pink" };
        return { letter: "F", color: "red" };
    }
    addCourseBtn.addEventListener('click', () => {
        const newCourse = document.createElement('div');
        newCourse.className = 'course';
        newCourse.innerHTML = `
            <input type="text" class="course-name" placeholder="Course Name" required>
            <input type="number" class="grade" placeholder="GPA (0.00 - 4.00)" min="0" max="4" step="0.001" required>
            <input type="number" class="credits" placeholder="Credits" min="0" required>
            <button class="remove-btn">Remove</button>
        `;
        courseContainer.appendChild(newCourse);
        void newCourse.offsetWidth;
        newCourse.style.opacity = 1;
    });

    courseContainer.addEventListener('click', (e) => {
        if (e.target.className === 'remove-btn') {
            if (courseContainer.children.length > 1) {
                e.target.parentElement.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => {
                    e.target.parentElement.remove();
                }, 500);
            }
        }
    });

    calculateBtn.addEventListener('click', () => {
        const courses = document.querySelectorAll('.course');
        let totalPoints = 0;
        let totalCredits = 0;
        let hasError = false;

        courses.forEach(course => {
            const gradeInput = course.querySelector('.grade');
            const creditsInput = course.querySelector('.credits');
            const grade = parseFloat(gradeInput.value);
            const credits = parseFloat(creditsInput.value);

            if (isNaN(grade) || grade < 0 || grade > 4) {
                gradeInput.style.border = '2px solid red';
                hasError = true;
            } else {
                gradeInput.style.border = '';
            }
            if (isNaN(credits) || credits <= 0) {
                creditsInput.style.border = '2px solid red';
                hasError = true;
            } else {
                creditsInput.style.border = '';
            }

            if (!hasError) {
                totalPoints += grade * credits;
                totalCredits += credits;
            }
        });

        const resultBox = document.getElementById('result');

        if (hasError || totalCredits === 0) {
            resultBox.innerHTML = `<h2 style="color:red;">⚠️ Please enter valid GPA (0-4) and Credits for all courses.</h2>`;
            return;
        }

        const gpa = totalPoints / totalCredits;
        const gpaFormatted = Math.round(gpa * 1000) / 1000;
        const percentage = Math.round((gpaFormatted * 20 + 20) * 100) / 100;
        const gradeLetter = getLetterGrade(gpaFormatted);

        resultBox.innerHTML = `
            <h2>Your GPA: <span id="gpa-value">${gpaFormatted.toFixed(3)}</span></h2>
            <h2>Your Percentage: <span id="percentage-value">${percentage.toFixed(2)}%</span></h2>
            <h2>Your Grade: <span style="color:${gradeLetter.color}; font-weight:bold;">${gradeLetter.letter}</span></h2>
        `;
        resultBox.style.animation = 'popUp 0.5s ease-in-out';

        calculateBtn.style.display = 'none';
        calculateAnotherBtn.style.display = 'inline-block';
    });

    calculateAnotherBtn.addEventListener('click', () => {
        courseContainer.innerHTML = `
            <div class="course">
                <input type="text" class="course-name" placeholder="Course Name" required>
                <input type="number" class="grade" placeholder="GPA (0.00 - 4.00)" min="0" max="4" step="0.001" required>
                <input type="number" class="credits" placeholder="Credits" min="0" required>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        document.getElementById('gpa-value').textContent = '0.000';
        document.getElementById('percentage-value').textContent = '0%';
        document.getElementById('result').innerHTML = `
            <h2>Your GPA: <span id="gpa-value">0.000</span></h2>
            <h2>Your Percentage: <span id="percentage-value">0%</span></h2>
        `;
        calculateAnotherBtn.style.display = 'none';
        calculateBtn.style.display = 'inline-block';
    });

    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
