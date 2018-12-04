# Farese

### Licenses

Map marker used under Creative Commons Attribution-NoDerivs 3.0 Unported license from [Icons8](https://icons8.com).

### Deployment notes

With a profile made for aws-cli called prbc, you can sync the root directory of the project with:

```
aws --profile prbc s3 sync . s3://farese.com --exclude ".git*" --delete
```
