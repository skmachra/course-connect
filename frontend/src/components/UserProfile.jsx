const UserProfile = ({ user, searchedCourse }) => {
  const courseInquirySubject = "Inquiry About Course";
  const courseInquiryBody = `Hello,\n\nI would like to know more about the course: ${searchedCourse.toUpperCase()}.\n\nThank you!`;

  return (
    <div className="border p-4 rounded mt-4">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p>
        Email:
        <a
          href={`mailto:${user.email}?subject=${encodeURIComponent(
            courseInquirySubject
          )}&body=${encodeURIComponent(courseInquiryBody)}`}
          className="text-blue-900 hover:underline"
        >
          {user.email}
        </a>
      </p>
      <p>Year of Study: {user.yearOfStudy}</p>
      <p>Branch: {user.branch}</p>
      <p>
        Courses: {user.courses.map((course) => course.toUpperCase()).join(", ")}
      </p>
    </div>
  );
};

export default UserProfile;
