// Home.js
import React from 'react';

function Home() {
  return (
    <div className='bg-mcgray rounded-lg p-5'>
      <div className="categories1 mb-5">
        <h1 className="text-white mb-4">Топ 3 самых затратных категорий</h1>
        <div className="cards grid gap-x-2 grid-cols-3">
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
        </div>
      </div>
      <div className="categories2 mb-5">
        <h1 className="text-white mb-4">Топ 3 самых прибыльных категорий</h1>
        <div className="cards grid gap-x-2 grid-cols-3">
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
          <div className="card text-white bg-mcblack p-5 rounded-lg">
            <h3>Название категории</h3>
            <h3>Сумма: 1000₽</h3>
          </div>
        </div>
      </div>
      <div className="diagram text-white">
        <div className="head flex justify-between items-center w-full mb-5">
          <h3>Операции по периодам</h3>
          <div className="p-2 pt-2 pb-2 bg-mcblack rounded-lg">
            <h3 className='m-0 cursor-pointer'>За неделю</h3>
          </div>
        </div>
        <div className="diagram-image bg-mcblack rounded-lg">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
