import React from "react"

function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen">
      <div className="bg-mcblack p-10 rounded-lg">
        <h1 className="text-mgreen text-center mb-4 bg-mcgray p-4 rounded-lg">Money Tracker</h1>
        <h2 className="text-white text-center mb-4">Регистрация</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white border border-mcgray"
              placeholder="Почта..."
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password1"
              className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white border border-mcgray"
              placeholder="Пароль..."
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password2"
              className="w-full box-border placeholder-white p-3 rounded-lg border-none bg-mcgray text-white border border-mcgray"
              placeholder="Повторите пароль..."
              required
            />
          </div>
          <div className="flex justify-between w-full">
            <button
              type="button"
              className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-mcgray border-none text-white p-3 rounded-lg hover:bg-mgreen"
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Register;
