import * as core from '@actions/core'

try {
  // `var` input defined in action metadata file
  const variable = core.getInput('variable')
  const isSecret = core.getBooleanInput('is-secret')
  const obj: Record<string, string> = JSON.parse(variable)
  for (const entry in Object.entries(obj)) {
    const [envName, envValue] = entry

    // Fail the action if this variable name is already in use
    if (process.env[envName]) {
      throw new Error(
        `The environment name "${envName}" is already in use. Please use an alias to ensure that each secret has a unique environment name`,
      )
    }

    // Inject a single secret
    if (isSecret) {
      core.debug(`Setting "${envName}" as secret.`)
      core.setSecret(envValue)
    }

    // Export variable
    core.info(
      `Injecting "${envName}" as environment variable with value: ${envValue}`,
    )
    core.exportVariable(envName, envValue)
  }
} catch (error) {
  console.error(error)
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed('Unknown error has occurred, checking logging above')
  }
}
