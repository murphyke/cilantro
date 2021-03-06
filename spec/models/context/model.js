define(['cilantro/models/context'], function (context) {

    describe('ContextModel', function() {
        var model;

        it('should define a manager', function() {
            model = new context.ContextModel;
            expect(model.manager).toBeDefined();
        });
    });

    describe('ContextCollection', function() {
        var col;

        beforeEach(function() {
            col = new context.ContextCollection;
        });

        it('should define a default session', function() {
            expect(col.getSession()).toBeDefined();
        });

        it('should merge session data on fetch', function() {
            col.url = '/mock/contexts.json';
            runs(function() {
                col.fetch();
            });

            waitsFor(function() {
                return !!col.getSession().id;
            });

            runs(function() {
                expect(col.length).toBe(1);
            });
        });
    });
});
