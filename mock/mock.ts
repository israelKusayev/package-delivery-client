import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Package } from '../src/models/package.model';

const server = express();

server.use(bodyParser.json());
server.listen(3001, () => { });

const packages: Package[] = [];

server.get('/api/packages', (req, res) => {
    res.json(packages);
});

server.get('/api/packages/:barcodeId', (req, res) => {
    const barcodeId = req.params.barcodeId as string;

    const existingPackage = packages.find(p => p.barcodeId === barcodeId);

    if (!existingPackage) {
        return res.status(404).end();
    }

    res.send(existingPackage);
});

server.post('/api/packages', (req, res) => {
    const mailPackage = req.body as Package;
    const existingPackage = packages.find(p => p.barcodeId === mailPackage.barcodeId);

    if (existingPackage) {
        res.status(400).send({ message: `package with barcode ${mailPackage.barcodeId} already exist` });
        return;
    }
    packages.push(mailPackage);

    res.status(201).send(mailPackage);
});

server.put('/api/packages/:barcodeId', (req, res) => {
    const barcodeId = req.params.barcodeId as string;

    const existingPackageIndex = packages.findIndex(p => p.barcodeId === barcodeId);

    if (existingPackageIndex === -1) {
        res.status(400).send({ message: `package with barcode ${barcodeId} not found` });
        return;
    }

    packages[existingPackageIndex] = {
        ...req.body as Package,
        barcodeId
    }

    res.status(204).end();
});

