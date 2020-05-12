# cross-env-var
Reference environment variables in npm scripts

# Usage

I use this in my npm scripts:

```javascript
{
  "config": {
    "Configuration": "Debug"
  },
  "scripts": {
    "msbuild": "cross-env-var msbuild /p:Configuration=$npm_config_configuration"
  }
}
```

The command that is executed when running `npm run msbuild`:

```
msbuild /p:Configuration=Debug
```

The command that is executed when running `npm run msbuild --Configuration=Release`:
```
msbuild /p:Configuration=Release
```
