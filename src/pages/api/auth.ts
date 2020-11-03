// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(req);
  fetch('https://react.staging.etvbharat.com?auth_token=xBUKcKnXfngfrqGoF93y')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.statusCode = 200;
      res.json(data);
    });
};
