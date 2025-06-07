function SimpleRegistrationForm() {
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({});

    const validateField = (name, value) => {
        let errorMsg = '';
        if (name === 'username' && value.trim() === '') {
            errorMsg = 'Username is required';
        } else if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorMsg = 'Email is not valid';
            }
        } else if (name === 'password' && value.length < 6) {
            errorMsg = 'Password must be at least 6 characters long';
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const handleChange = (e) => {
        validateField(e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to the server or perform any other action
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
}