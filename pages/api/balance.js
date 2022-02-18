export default async function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      return updateBalance(req, res);
  }
}

async function updateBalance(req, res) {}
