import ProjectSettings from 'models/project-settings';
import SubCommand from 'models/sub-command';
import MockUI from '../helpers/mock-ui';

describe('(Model) SubCommand', () => {
  const command = new SubCommand();

  describe('constructor', () => {
    it('should exit process when initialization of ProjectSettings fails', () => {
      const options = {
        ui: new MockUI()
      };
      const stub1 = sinon.stub(process, 'exit');
      const stub2 = sinon.stub(ProjectSettings.prototype, 'loadSettings').throws();

      const command = new SubCommand(options);
      expect(command.ui.errors).to.match(/invalid/);
      expect(stub1.calledWith(1));

      stub1.restore();
      stub2.restore();
    });
  });

  describe('subclass override intereface', () => {
    it('throws if subclass doesnt have run()', () => {
      expect(() => command.run()).to.throw(/must implement a run()/);
    });

    it('throws if subclass doesnt have availbleOptions()', () => {
      expect(() => command.availableOptions()).to.throw(
        /must implement an availableOptions()/
      );
    });
  });

  it('creates an environment which can be passed to tasks', function() {
    const options = {
      ui: 'cli interface',
      settings: 'project settings'
    };
    const command = new SubCommand(options);
    expect(command.environment).to.eql(options);
  });
});
