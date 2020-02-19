# Dogs of Make School API

## How to Run This Code

Clone this repository and run:

```
npm start
```

# Dogs Endpoints

## Get About Page

Send a request to `/dogs/about` to get the following response:

```json
{
  message: 'Dogs are awesome!'
}
```

## Get All Dogs

Send a GET request to `/dogs/` to get a list of all dogs. The data should look like:

```json
[
  {
    name: 'Tahoe',
    breed: 'mountain dog',
    color: 'black and white',
    _id: 123456789
  }
]
```

## Get a Single Dog

Send a GET request to `/dogs/ID_GOES_HERE` to get a list of all dogs. The data should look like:

```json
{
  name: 'Tahoe',
  breed: 'mountain dog',
  color: 'black and white',
  _id: 123456789
}
```

## Create a New Dog

Send a POST request to `/dogs/` with the following information:

```
name: string,
breed: string,
color: string
```

## Update a Dog

TODO

## Delete a Dog

TODO